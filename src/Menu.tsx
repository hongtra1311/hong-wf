/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { Button, Drawer, Dropdown } from "antd";
import { Input } from "antd";
import { MenuOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { DraweMenuWidgets } from "./common/menu/DraweMenuWidgets";
import { mockSearchCity } from "./mock/localApiMock";
import { CityCoordinates } from "./types/widget";
import { linkApi } from "./api/api";
import { css } from "@emotion/react";

const cityCoordinates = [
  { lat: 51.5074, lon: -0.1278 }, // London
  { lat: 40.7128, lon: -74.006 }, // New York
];

export const Menu = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const [cities, setCities] = useState<any[]>([]);
  const initialWidgets = [
    { id: "london", visible: true, order: 1, data: [] },
    { id: "newyork", visible: true, order: 2, data: [] },
  ];
  const [widgets, setWidgets] = useState(initialWidgets);

  const handleLocationSelect = (lat: number, lon: number) => {
    localStorage.setItem("lat", lat.toString());
    localStorage.setItem("lon", lon.toString());
    window.location.reload();
  };

  useEffect(() => {
    const fetchCityData = async (lat: number, lon: number) => {
      try {
        const response = await fetch(linkApi(lat, lon));
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching city data:", error);
        return null;
      }
    };
    const fetchAllCities = async () => {
      const promises = cityCoordinates.map(({ lat, lon }) =>
        fetchCityData(lat, lon)
      );
      const results = await Promise.all(promises);
      setCities(results);

      setWidgets([
        { id: "london", visible: true, order: 1, data: results[0] },
        { id: "newyork", visible: true, order: 2, data: results[1] },
      ]);
      console.log("cityData", cities);
    };
    fetchAllCities();
  }, []);

  const menuItems = [
    {
      key: "edit",
      label: "Edit List",
      onClick: () => setIsEditMode(!isEditMode),
    },
  ];
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityCoordinates[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    setIsSearch(true);
    if (!query) {
      setResults([]);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      // Huỷ yêu cầu cũ nếu có
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      mockSearchCity(query, controller.signal)
        .then((data) => {
          setResults(data);
          setIsSearch(false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error(err);
          }
        });
    }, 300); // debounce 300ms

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleAddWidget = async (result: CityCoordinates) => {
    const response = await fetch(linkApi(result.lat, result.lon));
    const data = await response.json();
    const isExisted = widgets.some((widget) => widget.id === result.city);
    if (!isExisted) {
      setCities([...cities, data]);
      setWidgets([
        ...widgets,
        {
          id: result.city,
          visible: true,
          order: widgets.length + 1,
          data: data,
        },
      ]);
    }
  };

  return (
    <>
      <Button
        icon={<MenuOutlined />}
        style={{
          marginLeft: "auto",
          border: "none",
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => setDrawerVisible(true)}
      />
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "hsl(223.41deg 62.44% 38.63%)",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            <span>Weather Search</span>
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                icon={<MoreOutlined />}
                type="text"
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              />
            </Dropdown>
          </div>
        }
        placement={isMobile ? "top" : "right"}
        onClose={() => {
          setDrawerVisible(false);
          setQuery("");
          setIsEditMode(false);
        }}
        open={drawerVisible}
        width={isMobile ? "100%" : 320}
        className={isMobile ? "mobile-drawer" : ""}
        height={isMobile ? "100vh" : undefined}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Input.Search
            placeholder="Search for a city..."
            enterButton={<SearchOutlined />}
            size="large"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            style={{ marginBottom: 24 }}
            css={css({
              button: {
                backgroundColor: "hsl(223.41deg 62.44% 38.63%)",
                ":where(.css-dev-only-do-not-override-btrt9z).ant-btn-variant-solid:not(:disabled):not(.ant-btn-disabled):hover":
                  {
                    backgroundColor: "hsl(223.41deg 62.44% 38.63%)",
                  },
              },
            })}
          />
          {query && results.length > 0 ? (
            <>
              <p> Search result... </p>
              {results.map((result) => (
                <a
                  key={result.city}
                  onClick={() => handleAddWidget(result)}
                  style={{ marginBottom: "10px" }}
                >
                  Add the weather of {result.city}
                </a>
              ))}
            </>
          ) : (
            <div style={{ height: "10px" }}></div>
          )}
          {widgets && cities && (
            <DraweMenuWidgets
              weatherData={cities}
              isEditMode={isEditMode}
              widgets={widgets}
              onWidgetsChange={setWidgets}
              onLocationSelect={handleLocationSelect}
            />
          )}
        </div>
      </Drawer>
    </>
  );
};
