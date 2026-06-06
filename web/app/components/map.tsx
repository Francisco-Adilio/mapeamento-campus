'use client'

import { useEffect, useRef, useState } from 'react'
import { useDrag, useScrollDirection } from '@mantine/hooks'
import { LocationPinIcon } from './location-pin-icon'
import { PlaceDrawer } from './place-drawer'

const INITIAL_VIEWBOX = { x: 0, y: 0, width: 1440, height: 810 }
const MIN_ZOOM = 0.75
const MAX_ZOOM = 3

export function Map() {
  const direction = useScrollDirection()
  const [zoom, setZoom] = useState(1)
  const [viewBox, setViewBox] = useState(INITIAL_VIEWBOX)
  const viewBoxRef = useRef(viewBox)
  const dragStartRef = useRef({ x: 0, y: 0 })

  const points: {id: number, x: number, y: number, color?: string }[] = [
    { id: 1, x: 880, y: 640, color: '#BF1234' },
    { id: 2, x: 877, y: 480 },
    { id: 3, x: 840, y: 520 },
    { id: 4, x: 800, y: 510 },
    { id: 5, x: 815, y: 410 },
    { id: 6, x: 685, y: 440 },
    { id: 7, x: 730, y: 420 },
    { id: 8, x: 580, y: 330 },
  ]

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

  const [drawerOpened, setDrawerOpened] = useState(false)
  const [pointId, setPointId] = useState<number>()
  function onLocationPinClick(id: number) {
    setPointId(id)
    setDrawerOpened(true)
  }

  return (
    <div
      ref={dragRef}
      style={{
        position: 'fixed',
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
        {
          points.map((point, key) => 
            <g 
              transform={`translate(${point.x}, ${point.y})`}
              onClick={() => onLocationPinClick(point.id)}  
              cursor="pointer"
              key={key}
            >
              <LocationPinIcon color={point.color} /> 
            </g>
          )
        }
      </svg>
      <PlaceDrawer opened={drawerOpened} onClose={() => setDrawerOpened(false)} />
    </div>
  )
}