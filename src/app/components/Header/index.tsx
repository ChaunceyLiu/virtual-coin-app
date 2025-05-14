"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchCoin from "../SearchCoin";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";

const Header = () => {
  const [isNetworkMenuOpen, setNetworkMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [value, setValue] = useState([]);

  const networks = [
    { name: "SOL", icon: "/ether.webp" },
    { name: "ETH", icon: "/solana.webp" },
    // 其他网络配置...
  ];

  return (
    <header className="flex h-[60px] items-center justify-between gap-x-[16px] border-b-[1px] border-b-line-100 border-gray-200">
      <div className="flex items-center gap-x-[16px] pl-4">
        <Link
          href="/?chain=eth"
          className="cursor-pointer w-[120px] h-[32px] flex-shrink-0"
        >
          <Image
            src="/logo_light.png"
            alt="gmgn"
            width={120}
            height={32}
            priority
          />
        </Link>

        <nav className="flex items-center gap-x-[16px] whitespace-nowrap">
          {[
            "trenches",
            "new-pair",
            "trend",
            "trade",
            "snipex",
            "monitor",
            "follow",
            "holding",
          ].map((path, index) => (
            <Link
              key={index}
              href={`/${path}?chain=eth`}
              className={`text-base font-normal transition-colors ${
                path === "trend"
                  ? "text-text-100"
                  : "text-text-300 hover:text-text-100"
              }`}
            >
              {
                [
                  "战壕",
                  "新币",
                  "热门",
                  "跟单",
                  "刮刀",
                  "监控",
                  "关注",
                  "持仓",
                ][index]
              }
            </Link>
          ))}
        </nav>
      </div>

      {/* 搜索框 */}
      <div className="w-[420px] relative flex-1 max-w-[420px]">
        {/* 搜索图标和输入框 */}
        <SearchCoin
          mode="multiple"
          value={value}
          placeholder="搜索代币/钱包"
          fetchOptions={() => Promise.resolve([])}
          style={{ width: "100%" }}
          onChange={(newValue) => {
            if (Array.isArray(newValue)) {
              setValue(newValue);
            }
          }}
        />
      </div>

      {/* 网络选择 */}
      <div className="relative flex flex-row">
        <button
          onClick={() => setNetworkMenuOpen(!isNetworkMenuOpen)}
          className="flex items-center gap-x-1.5 text-text-100"
        >
          <Image src="/ether.webp" alt="network" width={20} height={20} />
          <span>ETH</span>
          <DownOutlined className="w-[10]" />
        </button>

        {isNetworkMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-bg-100 rounded-lg shadow-lg">
            {networks.map((network) => (
              <div
                key={network.name}
                className="flex items-center p-3 hover:bg-gray-700"
              >
                <Image
                  src={network.icon}
                  alt={network.name}
                  width={20}
                  height={20}
                />
                <span className="ml-2">{network.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* 设置菜单 */}
        <button
          onClick={() => setSettingsMenuOpen(!isSettingsMenuOpen)}
          className="text-text-100 p-2 hover:bg-gray-700 rounded-lg"
        >
          {/* 设置图标 */}
          <SettingOutlined />
        </button>

        {isSettingsMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-bg-100 rounded-lg shadow-lg">
            {/* 菜单内容 */}
            <div className="p-3 hover:bg-gray-700">语言设置</div>
            <div className="p-3 hover:bg-gray-700">深色模式切换</div>
          </div>
        )}
      </div>

      {/* 钱包连接 */}
      <button className="bg-black text-white px-8 py-1 rounded-lg hover:bg-blue-600 transition-colors mr-2">
        连接
      </button>
    </header>
  );
};

export default Header;
