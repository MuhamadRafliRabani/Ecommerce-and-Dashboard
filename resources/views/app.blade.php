<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="shortcut icon" href="{{ secure_asset('icon.png') }}" type="image/x-icon">

  <title inertia>{{ config('app.name', 'Dashboard') }}</title>

  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=inter:400,500,600" rel="stylesheet">

  @routes
  @viteReactRefresh

  @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
  @inertiaHead
</head>

<body class="font-sans antialiased">
  @inertia
</body>

</html>
