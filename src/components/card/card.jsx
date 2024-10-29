import React from 'react'
import styles from './card.module.css'
import Inprogress from '../icons/inprogress'
import Backlog from '../icons/backlog'
import Todo from '../icons/todo'
import Cancelled from '../icons/cancelled'
import Nprior from '../icons/nprior'
import Lprior from '../icons/lprior'
import Mprior from '../icons/mprior'
import Hprior from '../icons/hprior'
import Urgpriogrey from '../icons/urgpriogrey'


const Card = ({id,title,status,priority,tag,user}) => {
    const returnStatus=(status)=>{
        if(status==="In progress") return <Inprogress/>;
        if(status==="Backlog") return <Backlog/>;
        if(status==="Todo") return <Todo/>;
        if(status==="Cancelled") return <Cancelled/>;
        return;
    }
    const returnPriority = (priority)=>{
        if(priority===0) return <Nprior/>;
        if(priority===1) return <Lprior/>;
        if(priority===2) return <Mprior/>;
        if(priority===3) return <Hprior/>;
        if(priority===4) return <Urgpriogrey/>;
    }
    console.log("user ",user)
    // const names = user.name ? user.name.split(" ") : ["", ""];
    // const firstName = names[0] || "";
    // const lastName = names.length > 1 ? names[1] : "";
  return (
    <div className={styles.ticketCard}>
      <div className={styles.id}>
        <div>{id}</div>
        <div className={styles}></div>
      </div>
      <div className={styles.body}>
        <div className={styles.status}>
            {
                returnStatus(status)
            }
        </div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.priority}>
            {returnPriority(priority)}
        </div>
        <div className={styles.tag}>
            <div className={styles.tico}></div>
            <div className={styles.ttex}>{tag.join(', ')}</div></div>
      </div>
    </div>
  )
}

export default Card
