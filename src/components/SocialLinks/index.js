import React from 'react'

export default ({ links }) => (
  <ul>
    {Object.entries(links).map(([key, url]) => (
      <li key={key}>
        <a href={url} target="_blank">
          {key}
        </a>
      </li>
    ))}
  </ul>
)
