import * as elements from 'typed-html'

export const BaseHtml = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>THE BETH STACK</title>
  <script src="/scripts/htmx.js"></script>
  <script src="/scripts/alpine.js" defer></script>
  <link href="/styles/global.css" rel="stylesheet">
</head>

${children}
`
