const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs'); // Name makes sense functionally
const bodyParser = require('koa-bodyparser')

const app = new Koa();
const router = new KoaRouter();
// app.use(async ctx=>{ctx.body = {msg: 'Hello, World'}});

app.use(bodyParser());

// Replace With DB
const items = ['Complete Assignments', 'Sleep', 'Watch a movies']

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

router.get('/', index);
router.get('/add', ShowAdd);
router.post('/add', Add);

async function Add(ctx) {
    const body = ctx.request.body;
    console.log(body);
    items.push(body.item);
    ctx.redirect('/');
};

async function ShowAdd(ctx){
    await ctx.render('ShowAdd');
};

async function index(ctx) {
    await ctx.render('index', {title: 'Todo List!', items: items});
};

app.listen(3000, ()=> {
    console.log("Server Started")
});