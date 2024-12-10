pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        // logo
        var logo = document.createElement('img');
        logo.src = 'https://playcanvas.com/api/assets/207164480/file/61e08459-d639-46ae-9867-71ab5432685a-removebg-preview.png'; // Custom logo URL
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        // progress bar container
        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        // progress bar
        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

        // Create sparks
        for (var i = 0; i < 50; i++) { // Reduced number of sparks for visibility
            var spark = document.createElement('div');
            spark.className = 'spark';
            splash.appendChild(spark);
        }
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: black;', // Black background for the screen
            '    margin: 0;',
            '    padding: 0;',
            '    overflow: hidden;',
            '}',
            '',
            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: black;', // Black background
            '    display: flex;',
            '    justify-content: center;',
            '    align-items: center;',
            '    animation: gradient-flow 10s infinite linear;', // Animated gradient effect
            '}',
            '',
            '#application-splash {',
            '    position: relative;',
            '    text-align: center;',
            '}',
            '',
            '#application-splash img {',
            '    width: 100%;', // Maximizes logo size
            '    height: 100%;',
            '    object-fit: contain;', // Ensures the logo keeps its aspect ratio
            '    image-rendering: crisp-edges;', // Prevents blurriness
            '    image-rendering: -moz-crisp-edges;',
            '    image-rendering: pixelated;',
            '}',
            '',
            '#progress-bar-container {',
            '    margin-top: 20px;',
            '    height: 8px;', // Thicker loading bar
            '    width: 80%;', // Adjusts the width of the progress bar
            '    background-color: #1d292c;', // Dark background for the bar
            '    border-radius: 4px;',
            '}',
            '',
            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #007bff;', // Blue loading bar
            '    border-radius: 4px;',
            '}',
            '',
            '@keyframes gradient-flow {',
            '    0% { background: linear-gradient(90deg, #000000, #282828, #000000); }', // Dark gradient
            '    50% { background: linear-gradient(90deg, #282828, #000000, #282828); }',
            '    100% { background: linear-gradient(90deg, #000000, #282828, #000000); }',
            '}',
            '',
            /* CSS for Sparks */
            '.spark {',
            '    position: absolute;',
            '    width: 20px;', // Increased width for bigger sparks
            '    height: 20px;', // Increased height for bigger sparks
            '    background-color: #007bff;', // Blue spark
            '    border-radius: 50%;',
            '    opacity: 0;',
            '    animation: spark-animation 1.5s infinite;',
            '}',
            '@keyframes spark-animation {',
            '    0% { opacity: 1; transform: translate(0, 0) scale(1); }',
            '    50% { opacity: 0.5; transform: translate(40px, -40px) scale(1.5); }', // Increased movement range
            '    100% { opacity: 0; transform: translate(80px, -80px) scale(2); }', // Further increased movement range
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});
