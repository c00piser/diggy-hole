/**
 * Help Menu: Manages the help menu screen
 * Created by Josh Benard on 11/19/15.
 */
module.exports = (function (){
    const SCREEN_WIDTH = 128;
    const SCREEN_HEIGHT = 128;

    var menu = document.getElementById("help-menu"),
        exit = document.getElementById("exit-btn"),
        wrap = document.getElementById("help-wrapper"),
        inputManager = require('./input-manager.js'),
        scroll = 0,
        Player = require('./player.js'),
        player,
        screenCtx,
        backBuffer,
        backBufferCtx,
        stateManager;

    /*
     * The load() method initializes the menu
     * and tells the DOM to render the menu HTML
     * parameters:
     * - sm the state manager
     */
    var load = function(sm) {
        stateManager = sm;
        menu.style.display = "flex";
        player = new Player(32,64,0, inputManager);

        // Set up the screen canvas
        var screen = document.createElement("canvas");
        screen.width = SCREEN_WIDTH;
        screen.height = SCREEN_HEIGHT;
        screenCtx = screen.getContext("2d");
        document.getElementById("player-tester").appendChild(screen);
    }

    /*
     * The exit() method hides the menu
     */
    var exit = function() {
        // delete the canvas object
        document.getElementById("player-tester").removeChild(document.getElementById("player-tester").firstChild);
        menu.style.display = "none";
    }

    /*
     * The update() method updates the menu,
     * scrolling the credits
     */
    var update = function(elapsedTime) {
        player.demoUpdate(elapsedTime, null);
    }

    /*
     * The render() method renders the menu
     * (in this case, a no-op as the menu is
     * HTML elements renderd by the DOM)
     */
    var render = function() {
        // Clear the back buffer
        screenCtx.fillStyle = 'rgb(255,255,255)';
        screenCtx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        screenCtx.save();

        player.render(screenCtx, false);

        screenCtx.restore();
    }

    /*
     * The keyHander() method handles key
     * events for the menu.
     */
    var keyDown = function(event) {
        switch(event.keyCode) {
            case 27: // ESC
                event.preventDefault();
                stateManager.popState();
                break;
            default:
                event.preventDefault();
                inputManager.keyDown(event);
                break;
        }
    }

    var keyUp = function(event) {
        inputManager.keyUp(event);
    }

    return {
        load: load,
        exit: exit,
        update: update,
        render: render,
        keyDown: keyDown,
        keyUp: keyUp
    }

})();