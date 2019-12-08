import React,{useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {Row, Col , List ,Icon ,BackTop ,Spin ,Affix } from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Rightmi from '../components/Rightmi'
import '../static/style/pages/index.css'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css'
import  servicePath  from '../config/apiUrl'
import CountUp from 'react-countup'


const Home = (res) =>{
  const [ mylist , setMylist ] = useState( res.list);
  const [ type , setType ] = useState( res.type);
  const [ loading,setLoading] =useState(false)





  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 

  const goLoading= ()=>{

    setLoading(true)
  }

  return (
    <>
      
      <Head>
        <title>首页 | 技术胖-胜洪宇关注web前端技术-前端免费视频第一博客</title>

      </Head>
      <Affix offsetTop={0}>
        <Header/>
      </Affix>
      
      
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={18}  >
              <div>
              
                <List
                  header={<div className="list-header">最新日志</div>}
                  itemLayout="vertical"
                  dataSource={mylist}
                  renderItem={item => (
                    <List.Item>
                      <Spin spinning={loading}>
                      <div className="list-title" onClick={goLoading} >
                        <Link  href={{pathname:'/detailed',query:{id:item.id}}} >
                          <a>{item.title}</a>
                        </Link>
                      </div>
                      <div className="list-icon">
                        <span><Icon type="calendar" /> {item.addTime}</span>
                        <span><Icon type="folder" /> {item.typeName}</span>
                        <span><Icon type="fire" /><CountUp end={item.view_count} />人</span>
                      </div>
                      <div className="list-context"
                          dangerouslySetInnerHTML={{__html:item.introduce_html}}
                      >
                      </div>  
                      <div className="list-go">
                          <Icon type="file" /> &nbsp;
                          <span  onClick={goLoading} onClick={goLoading}>
                            <Link href={{pathname:'/detailed',query:{id:item.id}}} >
                              <a>查看全文 </a>
                            </Link>
                          </span>
                      </div>
                      </Spin>
                    </List.Item>
                  )}
                />  
                  
              </div>
          </Col>
    
          <Col className="comm-right" xs={0} sm={0} md={6} >
            <Author />
            <Affix offsetTop={60}>
              <Rightmi/>
              <Advert />
            </Affix>
            
          </Col>
        </Row>
      
      <Footer/>
      <BackTop />
   </>
  )

} 

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
       
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home
