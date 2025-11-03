import { useState, useEffect } from 'react'

export default function ConnectionStatus() {
    const [isOnline, setIsOnline] = useState(true)

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await fetch('/', { method: 'HEAD' })
                setIsOnline(response.ok)
            } catch (error) {
                setIsOnline(false)
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
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs sm:text-sm font-semibold rounded-xl sm:rounded-2xl shadow-2xl border border-emerald-400/50 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Connected</span>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl shadow-2xl border border-red-400/50 animate-bounce backdrop-blur-sm">
                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                <div>
                    <div className="font-bold">Connection Lost</div>
                    <div className="text-xs sm:text-sm opacity-90">
                        Backend not responding
                    </div>
                </div>
            </div>
        </div>
    )
}