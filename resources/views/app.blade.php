<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Bookadian</title>

        
        <link href="{{asset('css/app.css')}}" rel="stylesheet">
        <script
        src="https://kit.fontawesome.com/fc31dedf63.js"     
        crossorigin="anonymous">
        </script> <!-- fontawesome cdn for react -->
        
        </head>
    <body>
    <div id='app'>
    
    </div>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>