// components/Footer.tsx
import Link from "next/link";
import type { FC } from "react";
import {
  AndroidOutlined,
  ArrowsAltOutlined,
  BankOutlined,
  BarChartOutlined,
  CodeOutlined,
  FireOutlined,
  GiftOutlined,
  LineChartOutlined,
  ShareAltOutlined,
  TrophyOutlined,
  UserOutlined,
  WechatOutlined,
  XOutlined,
} from "@ant-design/icons";

const Footer: FC<{ solPrice?: string }> = ({ solPrice = "$180.67" }) => {
  return (
    <footer className="flex h-9 justify-between px-6 text-sm font-medium bg-bg-200 border-t border-line-100 border-gray-200  min-h-[44px]">
      <div className="flex items-center gap-2">
        {/* 左侧导航组 */}
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-[6px] cursor-pointer text-text-300 hover:text-text-100 hover:bg-hover-200">
          <FireOutlined />
          <span>狙击新币</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-[6px] cursor-pointer text-text-300 hover:text-text-100 hover:bg-hover-200">
          <UserOutlined />
          <span>已关注</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-[6px] cursor-pointer text-text-300 hover:text-text-100 hover:bg-hover-200">
          <LineChartOutlined />
          <span>持仓</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-[6px] cursor-pointer text-text-300 hover:text-text-100 hover:bg-hover-200">
          <BarChartOutlined />
          <span>盈亏追踪</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-[6px] cursor-pointer text-text-300 hover:text-text-100 hover:bg-hover-200">
          <GiftOutlined />
          <span>邀请返佣</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-[6px] cursor-pointer text-text-300 hover:text-text-100 hover:bg-hover-200">
          <TrophyOutlined />
          <span>交易赛</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-[6px] cursor-pointer text-text-300 hover:text-text-100 hover:bg-hover-200">
          <ShareAltOutlined />
          <span>推特监控</span>
        </div>
      </div>

      {/* 右侧状态组 */}
      <div className="flex items-center gap-4">
        {/* 稳定状态指示器 */}
        <div className="flex items-center px-2 py-1 gap-1 rounded bg-green-200 text-green-100">
          <div className="flex justify-center items-center w-3 h-3 rounded-full bg-green-200">
            <div className="w-2 h-2 rounded-full bg-green-100" />
          </div>
          <span>Stable</span>
        </div>

        {/* 移动端APP链接 */}
        <Link
          href="/app"
          className="flex items-center gap-1 px-1.5 py-1 text-text-300 hover:text-text-100 hover:bg-hover-200"
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            {/* APP图标路径 */}
          </svg>
          <span>Mobile APP</span>
        </Link>
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-[6px] cursor-pointer text-text-300 hover:text-text-100 hover:bg-hover-200">
          <BankOutlined />
          <span>使用教程</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-[6px] cursor-pointer text-text-300 hover:text-text-100 hover:bg-hover-200">
          <CodeOutlined />
          <span>关于GMGN</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-[6px] cursor-pointer text-text-300 hover:text-text-100 hover:bg-hover-200">
          <AndroidOutlined />
          <span>电报BOT</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-1 rounded-[6px] cursor-pointer text-text-300 hover:text-text-100 hover:bg-hover-200">
          <ArrowsAltOutlined />
          <span>API</span>
        </div>

        {/* 社交媒体链接 */}
        <div className="flex items-center gap-3">
          <a
            href="https://twitter.com/gmgnai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-300 hover:text-text-100"
            aria-label="Twitter"
          >
            {/* Twitter SVG */}
            <XOutlined />
          </a>

          <a
            href="https://twitter.com/gmgnai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-300 hover:text-text-100"
            aria-label="Twitter"
          >
            {/* Twitter SVG */}
            <WechatOutlined />
          </a>

          {/* 实时SOL价格 */}
          <div className="text-text-100">{`SOL: ${solPrice}`}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
