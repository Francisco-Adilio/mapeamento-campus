'use client'

import { useEffect, useRef, useState } from 'react'
import { useDrag, useScrollDirection } from '@mantine/hooks'
import { LocationPinIcon } from './location-pin-icon'

const INITIAL_VIEWBOX = { x: 0, y: 0, width: 1440, height: 810 }
const MIN_ZOOM = 0.75
const MAX_ZOOM = 3

export function Map() {
  const direction = useScrollDirection()
  const [zoom, setZoom] = useState(1)
  const [viewBox, setViewBox] = useState(INITIAL_VIEWBOX)
  const viewBoxRef = useRef(viewBox)
  const dragStartRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    viewBoxRef.current = viewBox
  }, [viewBox])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()

      const wheelDirection = event.deltaY < 0 ? 'up' : 'down'
      const shouldZoomIn = wheelDirection === 'up' || direction === 'up'
      const nextZoom = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, zoom + (shouldZoomIn ? 0.12 : -0.12))
      )

      const currentViewBox = viewBoxRef.current
      const zoomRatio = zoom / nextZoom
      const nextWidth = currentViewBox.width * zoomRatio
      const nextHeight = currentViewBox.height * zoomRatio
      const pointerX = event.clientX / window.innerWidth
      const pointerY = event.clientY / window.innerHeight

      setZoom(nextZoom)
      setViewBox({
        x: currentViewBox.x + (currentViewBox.width - nextWidth) * pointerX,
        y: currentViewBox.y + (currentViewBox.height - nextHeight) * pointerY,
        width: nextWidth,
        height: nextHeight,
      })
    }

    window.addEventListener('wheel', onWheel, { passive: false })

    return () => window.removeEventListener('wheel', onWheel)
  }, [direction, zoom])

  const { ref: dragRef, active } = useDrag(
    (state) => {
      if (state.first) {
        dragStartRef.current = { x: viewBoxRef.current.x, y: viewBoxRef.current.y }
      }

      setViewBox((currentViewBox) => ({
        ...currentViewBox,
        x: dragStartRef.current.x - state.movement[0],
        y: dragStartRef.current.y - state.movement[1],
      }))
    },
  )

  function onClick() {
    window.alert("Clicou")
  }

  return (
    <div
      ref={dragRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: '#79b369',
        cursor: active ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <svg
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="xMidYMid meet"
        width="1440"
        height="810"
        style={{ display: 'block' }}
      >
        <image href="/campus.svg" x="0" y="0" width="1440" height="810" />
        <g 
          transform="translate(880, 640)"
          onClick={onClick}  
          cursor="pointer"
        >
         <LocationPinIcon /> 
        </g>
      </svg>
    </div>
  )
}