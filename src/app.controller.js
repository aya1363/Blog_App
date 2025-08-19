
import useRouter from './modules/user/user.controller.js'
import commentRouter from './modules/comment/comment.controller.js'
import postRouter from './modules/post/post.controller.js'
import express from 'express'
import { checkDBconnection, DBconnection } from './DB/connection.db.js'

const bootstrap =async () => {
    const app = express()
    const port = 3000
    //DB
    await checkDBconnection()
    await DBconnection()
    
    app.use(express.json())
    app.get('/', (req, res, next) => { res.json({ msg: 'welcome to NodeBlogAPI' }) })
    app.use('/user',useRouter)
    app.use('/posts',postRouter)
    app.use('/comments',commentRouter)

    app.all('{/*dummy}', (req, res ,next) => {
        res.json({msg:'invalid routing'})
    })

    return app.listen(port, () => { console.log(`server is running on port ${port}`)})
}
export default bootstrap