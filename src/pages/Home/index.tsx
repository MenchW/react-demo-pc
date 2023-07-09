// 使用scss模块化引入
import styles from './index.module.scss'
function Home() {
    return <div className={ styles.box}>
        home
    </div>
}

export default Home
