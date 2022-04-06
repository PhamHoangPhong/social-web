import { Alert } from '@mui/material'
import React from 'react'

const AlertMessage = ({info}) => {
  return (
    info ? <Alert style={{position: 'absolute', top: '60px', right: '20px', zIndex: 100}} severity={info.severity}>{info.content}</Alert> : ''
  )
}

export default AlertMessage