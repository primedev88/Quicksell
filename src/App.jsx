import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Nav from "./components/navbar/nav";
//import data from "./data.json";
import Card from "./components/card/card";
import Add from "./components/icons/add";
import Dotmenu from "./components/icons/dotmenu";
import User from "./components/User/user";
import Todo from "./components/icons/todo";
import Backlog from "./components/icons/backlog";
import Inprogress from "./components/icons/inprogress";
import Cancelled from "./components/icons/cancelled";
import Done from "./components/icons/done";
import Nprior from "./components/icons/nprior";
import Lprior from "./components/icons/lprior";
import Mprior from "./components/icons/mprior";
import Hprior from "./components/icons/hprior";
import Urgpriorcol from "./components/icons/urgpriorcol";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const [userMode, setUserMode] = useState(true);
  const [statusMode, setStatusMode] = useState(false);
  const [priorityMode, setPriorityMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const groupTicketsByUser = () => {
    const groupedTickets = {};
    data?.users.forEach((user) => {
      groupedTickets[user.id] = {
        name: user.name,
        available: user.available,
        tickets: data.tickets.filter((ticket) => ticket.userId === user.id),
      };
    });
    return groupedTickets;
  };
  const groupedTickets = groupTicketsByUser();

  const groupTicketsByStatus = () => {
    const groupedByStatus = {};
    groupedByStatus["Todo"] = [];
    groupedByStatus["Backlog"] = [];
    groupedByStatus["In progress"] = [];
    groupedByStatus["Done"] = [];
    groupedByStatus["Cancelled"] = [];
    data?.tickets.forEach((ticket) => {
      const user = data.users.find((user) => user.id === ticket.userId);
      const ticketWithUser = { ...ticket, user };

      if (!groupedByStatus[ticket.status]) {
        groupedByStatus[ticket.status] = [];
      }
      groupedByStatus[ticket.status].push(ticketWithUser);
    });
    return groupedByStatus;
  };
  const groupedByStatus = groupTicketsByStatus();
  console.log(groupedByStatus);

  const groupTicketsByPrior = () => {
    const groupedByPrior = {};
    groupedByPrior[4] = [];
    groupedByPrior[3] = [];
    groupedByPrior[2] = [];
    groupedByPrior[1] = [];
    groupedByPrior[0] = [];
    data?.tickets.forEach((ticket) => {
      const user = data.users.find((user) => user.id === ticket.userId);
      const ticketWithUser = { ...ticket, user };

      if (!groupedByPrior[ticket.priority]) {
        groupedByPrior[ticket.priority] = [];
      }
      groupedByPrior[ticket.priority].push(ticketWithUser);
    });
    return groupedByPrior;
  };
  const groupedByPrior = groupTicketsByPrior();
  console.log(groupedByPrior);

  const getStatusIcon = (status) => {
    if (status === "Todo") return <Todo />;
    if (status === "Backlog") return <Backlog />;
    if (status === "In progress") return <Inprogress />;
    if (status === "Cancelled") return <Cancelled />;
    if (status === "Done") return <Done />;
  };
  const getPriorityIcon = (priority) => {
    if (priority == 0) return <Nprior />;
    if (priority == 1) return <Lprior />;
    if (priority == 2) return <Mprior />;
    if (priority == 3) return <Hprior />;
    if (priority == 4) return <Urgpriorcol />;
  };
  const getPriorityName = (priority) => {
    if (priority == 0) return "No Priority";
    if (priority == 1) return "Low Priority";
    if (priority == 2) return "Medium Priority";
    if (priority == 3) return "High Priority";
    if (priority == 4) return "Urgent Priority";
  };
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <Nav
          setUser={setUserMode}
          user={userMode}
          status={statusMode}
          setStatus={setStatusMode}
          priority={priorityMode}
          setPriority={setPriorityMode}
        />
      </div>
      <div className={styles.content}>
        {userMode &&
          Object.keys(groupedTickets).map((userId) => {
            const user = groupedTickets[userId];
            const names = user.name ? user.name.split(" ") : ["", ""];
            const firstName = names[0] || "";
            const lastName = names.length > 1 ? names[1] : "";

            return (
              <div key={userId} className={styles.userColumn}>
                <div className={styles.user}>
                  <div className={styles.left}>
                    <div className={styles.photo}>
                      <div className={styles.userPhoto}>
                        <User firstName={firstName} lastName={lastName} />
                      </div>
                      <div
                        className={styles.userStatus}
                        style={
                          user.available === false
                            ? { backgroundColor: "#e18e6b" }
                            : { backgroundColor: "#6be16f" }
                        }
                      ></div>
                    </div>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.count}>{user.tickets.length}</div>
                  </div>
                  <div className={styles.menu}>
                    <Add />
                    <Dotmenu />
                  </div>
                </div>
                {user.tickets.length > 0 ? (
                  user.tickets.map((ticket) => (
                    <div key={ticket.id}>
                      <Card
                        id={ticket.id}
                        title={ticket.title}
                        status={ticket.status}
                        priority={ticket.priority}
                        tag={ticket.tag}
                      />
                    </div>
                  ))
                ) : (
                  <p>No tickets assigned</p>
                )}
              </div>
            );
          })}
        {statusMode &&
          Object.keys(groupedByStatus).map((status) => (
            <div key={status} className={styles.userColumn}>
              <div className={styles.user}>
                <div className={styles.left}>
                  {getStatusIcon(status)}

                  <div className={styles.userName}>{status}</div>
                  <div className={styles.count}>
                    {groupedByStatus[status].length}
                  </div>
                </div>
                <div className={styles.menu}>
                  <Add />
                  <Dotmenu />
                </div>
              </div>
              {groupedByStatus[status].map((ticket) => {
                return (
                  <div key={ticket.id} className={styles.ticketRow}>
                    <Card
                      id={ticket.id}
                      title={ticket.title}
                      status={ticket.status}
                      priority={ticket.priority}
                      tag={ticket.tag}
                      user={ticket.user}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        {priorityMode &&
          Object.keys(groupedByPrior).map((priority) => (
            <div key={priority} className={styles.userColumn}>
              <div className={styles.user}>
                <div className={styles.left}>
                  {getPriorityIcon(4 - priority)}

                  <div className={styles.userName}>
                    {getPriorityName(4 - priority)}
                  </div>
                  <div className={styles.count}>
                    {groupedByPrior[4 - priority].length}
                  </div>
                </div>
                <div className={styles.menu}>
                  <Add />
                  <Dotmenu />
                </div>
              </div>
              {groupedByPrior[4 - priority].map((ticket) => {
                return (
                  <div key={ticket.id} className={styles.ticketRow}>
                    <Card
                      id={ticket.id}
                      title={ticket.title}
                      status={ticket.status}
                      priority={ticket.priority}
                      tag={ticket.tag}
                    />
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
