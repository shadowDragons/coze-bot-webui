'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    CozeWebSDK: {
      WebChatClient: new (config: {
        config: {
          bot_id: string | null
        }
        componentProps: {
          title: string
          width: string
        }
        ui: {
          asstBtn: {
            isNeed: boolean
          }
        }
      }) => any
    }
  }
}

export default function CozeChat() {
  const searchParams = useSearchParams()
  const [showInput, setShowInput] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const botId = searchParams.get('botId')
    if (!botId) {
      setShowInput(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/cn/index.js'
    script.async = true
    script.onload = () => {
      const cozeWebSDK = new window.CozeWebSDK.WebChatClient({
        config: {
          bot_id: botId,
        },
        componentProps: {
          title: 'Coze',
          width: '98%',
        },
        ui: {
          asstBtn: {
            isNeed: true,
          },
        },
      })
      cozeWebSDK.showChatBot()
    }
    document.body.appendChild(script)

    // 清理函数
    return () => {
      document.body.removeChild(script)
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      window.location.href = `${window.location.pathname}?botId=${inputValue.trim()}`
    }
  }

  if (showInput) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='max-w-md w-full p-6 bg-white rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-8'>请输入您的 Bot ID</h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='text'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='输入 Bot ID'
              autoFocus
            />
            <button type='submit' className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors'>
              确认
            </button>
          </form>
        </div>
      </div>
    )
  }

  return null
}
