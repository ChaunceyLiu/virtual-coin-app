"use client";
import type { TableColumnsType, TableProps } from "antd";
import { Avatar, Button, Segmented, Table } from "antd";
import { useState } from "react";
import { rankMock } from "@/mock/rankMock";
import {
  CopyOutlined,
  GlobalOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  SendOutlined,
  SettingOutlined,
  XOutlined,
} from "@ant-design/icons";
import hn from "human-number";

export interface DataType {
  symbol: string;
  address: string;
  buys: number;
  sells: number;
  [key: string]: any;
}

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const CoinTable: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const columns: TableColumnsType<DataType> = [
    {
      title: "币种",
      dataIndex: "symbol",
      key: "symbol",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      width: 300,
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.symbol.includes(value as string),
      sorter: (a, b) => a.symbol.length - b.symbol.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            src={record.logo}
            alt={record.symbol}
            size={50}
            className="min-w-[50]"
          ></Avatar>
          <div>
            <p>
              {`${record?.symbol}`}
              <SearchOutlined />
            </p>
            <p className="text-[#858E8F] text-[12px]">
              {`$${record?.address.replace(/^(.{4}).*(.{4})$/, "$1...$2")}`}
              <CopyOutlined className="ml-1" />
              <XOutlined className="ml-1" />
              <GlobalOutlined className="ml-1" />
              <SendOutlined className="ml-1" />
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "池子",
      dataIndex: "liquidity",
      key: "liquidity",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value as string),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, record) => <span>{`${hn(Number(record?.liquidity))}`}</span>,
    },
    {
      title: "持有者",
      dataIndex: "holder_count",
      key: "holder_count",
      render: (_, record) => <span>{`${record?.holder_count}K`}</span>,
    },
    {
      title: "1h交易数",
      dataIndex: "buys",
      key: "buys",
      render: (_, record) => (
        <div>
          <p className="font-bold">{record?.buys + record?.sells}</p>
          <p>
            <span className="text-green-900">{record?.buys}</span>/
            <span className="text-red-900">{record?.sells}</span>
          </p>
        </div>
      ),
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      render: (_, record) => <span>{`$${(record?.price).toFixed(4)}`}</span>,
    },
    {
      title: "1m%",
      dataIndex: "price_change_percent1m",
      key: "price_change_percent1m",
      render: (_, record) => (
        <span
          className={`${
            record.price_change_percent1m > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {`${record?.price_change_percent1m.toFixed(1)}%`}
        </span>
      ),
    },
    {
      title: "5m%",
      dataIndex: "price_change_percent5m",
      key: "price_change_percent5m",
      render: (_, record) => (
        <span
          className={`${
            record.price_change_percent1m > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {`${record?.price_change_percent5m.toFixed(1)}%`}
        </span>
      ),
    },
    {
      title: "1h%",
      dataIndex: "price_change_percent1h",
      key: "price_change_percent1h",
      render: (_, record) => (
        <span
          className={`${
            record.price_change_percent1m > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {`${record?.price_change_percent1h.toFixed(1)}%`}
        </span>
      ),
    },
  ];

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-between w-full h-10 px-4 bg-bg-200 mb-4">
        <div className="flex items-center gap-2">
          <div className="font-bold cursor-pointer">热门</div>
          <div className="font-bold flex mx-4 text-[#858E8F] cursor-pointer">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.1019 9.21538C14.8711 8.46998 13.4429 8.04348 11.9196 8.04348C10.3963 8.04348 8.96793 8.47005 7.73711 9.21555L5.96595 5.997C7.71778 4.93523 9.75108 4.32764 11.9196 4.32764C14.0881 4.32764 16.1213 4.93516 17.873 5.99683L16.1019 9.21538Z"
              ></path>
              <path d="M6.77571 9.90109C4.80761 11.5094 3.54173 14.0193 3.54173 16.8393 3.54173 17.8654 2.74889 18.6972 1.77087 18.6972.792843 18.6972 0 17.8654 0 16.8393 0 12.643 1.97007 8.92942 4.99277 6.66113L6.77571 9.90109ZM20.2962 16.8391C20.2962 14.0192 19.0305 11.5094 17.0625 9.9011L18.8454 6.66113C21.868 8.92944 23.838 12.6429 23.838 16.8391 23.838 17.8652 23.0451 18.697 22.0671 18.697 21.0891 18.697 20.2962 17.8652 20.2962 16.8391ZM12 10.8695 13.5868 16.4671C13.8852 17.52 13.0943 18.5662 12 18.5662 10.9057 18.5662 10.1148 17.52 10.4132 16.4671L12 10.8695Z"></path>
            </svg>
            <span className="ml-1">下个蓝筹</span>
          </div>
          <Segmented<string>
            options={["1m", "5m", "1h", "6h", "24h"]}
            onChange={(value) => {
              console.log(value); // string
            }}
          />
        </div>
        <div>
          <Button
            style={{ color: "#333" }}
            type="link"
            icon={<LoginOutlined />}
          >
            过滤devs
          </Button>
          <Button
            style={{ color: "#333" }}
            type="link"
            icon={<MenuFoldOutlined />}
          >
            筛选
          </Button>
          <SettingOutlined />
        </div>
      </div>
      <div className="flex flex-col w-full h-full overflow-y-auto">
        <Table<DataType>
          columns={columns}
          dataSource={rankMock.data.rank}
          onChange={handleChange}
          pagination={false}
          scroll={{ y: 750, x: 1200 }}
          virtual
        />
      </div>
    </div>
  );
};

export default CoinTable;
