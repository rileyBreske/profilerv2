import * as React from "react"

interface GaugeProps {
  value: number
  max: number
  label: string
}

export function Gauge({ value, max, label }: GaugeProps) {
  const percentage = (value / max) * 100
  const rotation = (percentage / 100) * 180

  return (
    <div className="relative w-48 h-24 flex flex-col items-center justify-end">
      <div className="absolute w-48 h-24 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-48 h-48 border-24 border-gray-200 rounded-full"
        ></div>
        <div 
          className="absolute top-0 left-0 w-48 h-48 border-24 border-blue-500 rounded-full"
          style={{ 
            clipPath: `polygon(24px 24px, 24px 24px, 24px 120px, 120px 120px)`,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center center'
          }}
        ></div>
      </div>
      <div className="relative text-2xl font-bold">{label}</div>
    </div>
  )
}