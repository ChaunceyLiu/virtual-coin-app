import { useConnect, useAccount, useDisconnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import { useEffect, useState } from 'react'

const ConnectWalletButton = () => {
  const [mounted, setMounted] = useState(false)
  const { connect, status, error } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  // 解决 hydration 问题
  useEffect(() => setMounted(true), [])

  // 处理连接状态文本
  const getButtonText = () => {
    if (!mounted) return '连接'
    if (isConnected) return `${address?.slice(0, 6)}...${address?.slice(-4)}`
    if (status === 'pending') return '连接中...'
    return '连接'
  }

  // 处理连接/断开点击
  const handleClick = () => {
    if (isConnected) {
      disconnect()
    } else {
      connect({ connector: metaMask() })
    }
  }

  // 错误提示
  useEffect(() => {
    if (error) {
      console.error('连接错误:', error)
      alert(`连接失败: ${error.message}`)
    }
  }, [error])

  return (
    <button
      className="bg-black text-white px-8 py-1 rounded-lg hover:bg-blue-600 transition-colors mr-2 disabled:opacity-50"
      onClick={handleClick}
      disabled={status === 'pending'}
    >
      {getButtonText()}
    </button>
  )
}

export default ConnectWalletButton