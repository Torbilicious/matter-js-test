// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    body = Matter.Body,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    engine,
    render;

main = function () {

    // create an engine
    engine = Engine.create();

    // create a renderer
    render = Render.create({
        element: document.getElementById("renderer"),
        engine: engine,
        options: {
            width: Math.min(document.documentElement.clientWidth, 800),
            height: Math.min(document.documentElement.clientHeight, 600)
        }
    });

    var mouseSettings = addMouseConstraints();
    World.add(engine.world, mouseSettings.mouseConstraint);
    render.mouse = mouseSettings.mouse;

    // run the engine
    Engine.run(engine);
    // run the renderer
    Render.run(render);


    setupBodies();
};

setupBodies = function () {

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 120, 50);
    body.setInertia(boxA, Infinity);
    var circle = Bodies.circle(200, 200, 50, { restitution: 0.9 });

    setGravity(0, 0);

    // add all of the bodies to the world
    World.add(engine.world, [
        boxA,
        circle,
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);
};

createNewBox = function () {

    var box = Bodies.rectangle(450, 50, 80, 80);
    World.add(engine.world, [box]);
};

setGravity = function(xGrav, yGrav) {

    var gravity = engine.world.gravity;
    gravity.x = xGrav;
    gravity.y = yGrav;
};

addMouseConstraints = function () {

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    return {
        mouse: mouse,
        mouseConstraint: mouseConstraint
    };
};
