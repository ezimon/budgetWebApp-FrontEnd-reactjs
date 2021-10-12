import React from 'react'
import { CakeCurrent } from './CakeCurrent';
import { CakeRecount } from './CakeRecount';
import './stats.css'

export const Stats = ({ apiUrl }) => {
  return (
    <div>
      <CakeCurrent apiUrl={apiUrl} />
      <CakeRecount apiUrl={apiUrl} />
    </div>
  )
}
