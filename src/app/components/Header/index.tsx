"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchCoin from "../SearchCoin";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import ConnectWalletButton from "../Connect";
import { searchMock } from "@/mock/searchMock";

const Header = () => {
  const [newWork, setNetwork] = useState({
    name: "SOL",
    image: "/solana.webp",
  });
  const [isSettingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [value, setValue] = useState<any>([]);

  const networks = [
    {
      name: "SOL",
      image: "/solana.webp",
      key: "sol",
      label: (
        <div
          className="flex items-center p-3 hover:bg-gray-700"
          onClick={() => {
            setNetwork({
              name: "SOL",
              image: "/solana.webp",
            });
          }}
        >
          <Image src="/solana.webp" alt={"SOL"} width={20} height={20} />
          <span className="ml-2">SOL</span>
        </div>
      ),
    },
    {
      name: "ETH",
      image: "/ether.webp",
      key: "eth",
      label: (
        <div
          className="flex items-center p-3 hover:bg-gray-700"
          onClick={() => {
            setNetwork({
              name: "ETH",
              image: "/ether.webp",
            });
          }}
        >
          <Image src="/ether.webp" alt={"ETH"} width={20} height={20} />
          <span className="ml-2">ETH</span>
        </div>
      ),
    },
    // 其他网络配置...
  ];

  const settings = [
    {
      key: "trade",
      label: (
        <a
          href="https://t.me/GMGN_sol03_bot"
          onClick={(e) => e.preventDefault()}
        >
          Telegram交易Bot
        </a>
      ),
    },
    {
      key: "voiceSetting",
      label: <a onClick={(e) => e.preventDefault()}>声音设置</a>,
    },
  ];

  return (
    <header className="flex h-[60px] items-center justify-between gap-x-[16px] border-b-[1px] border-b-line-100 border-gray-200 min-h-[60px]">
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
        <SearchCoin
          mode="multiple"
          value={value}
          placeholder="搜索代币/钱包"
          fetchOptions={() => Promise.resolve(searchMock.data.rank)}
          defaultOptions={searchMock.data.rank}
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
        <Dropdown menu={{ items: networks }}>
          <Space>
            <Image src={newWork.image} alt="network" width={20} height={20} />
            <span>{newWork.name}</span>
            <DownOutlined className="w-[10]" />
          </Space>
        </Dropdown>

        {/* 设置菜单 */}
        <Dropdown menu={{ items: settings }}>
          <SettingOutlined className="ml-4" />
        </Dropdown>

        {isSettingsMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-bg-100 rounded-lg shadow-lg">
            {/* 菜单内容 */}
            <div className="p-3 hover:bg-gray-700">语言设置</div>
            <div className="p-3 hover:bg-gray-700">深色模式切换</div>
          </div>
        )}
      </div>

      {/* 钱包连接 */}
      <ConnectWalletButton />
    </header>
  );
};

export default Header;
