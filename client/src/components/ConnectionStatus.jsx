import { useState, useEffect } from 'react'

export default function ConnectionStatus() {
    const [isOnline, setIsOnline] = useState(true)
    const [lastCheck, setLastCheck] = useState(new Date())

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await fetch('/', { method: 'HEAD' })
                setIsOnline(response.ok)
                setLastCheck(new Date())
            } catch (error) {
                setIsOnline(false)
                setLastCheck(new Date())
            }
        }

        // Check immediately
        checkConnection()

        // Check every 30 seconds
        const interval = setInterval(checkConnection, 30000)

        return () => clearInterval(interval)
    }, [])

    if (isOnline) {
        return (
            <div className="fixed bottom-4 right-4 z-50 opacity-75 hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500 text-white text-xs font-medium rounded-full shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Connected</span>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="flex items-center gap-2 px-4 py-3 bg-red-500 text-white text-sm font-medium rounded-xl shadow-xl animate-bounce">
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                <div>
                    <div className="font-bold">Connection Lost</div>
                    <div className="text-xs opacity-90">
                        Backend not responding
                    </div>
                </div>
            </div>
        </div>
    )
}