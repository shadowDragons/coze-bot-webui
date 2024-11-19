'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

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

  useEffect(() => {
    const botId = searchParams.get('botId')

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

  return null
}
