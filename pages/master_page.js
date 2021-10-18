import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '50px'
  },
}));


export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    const config = {
        headers: {
          "x-api-key": "ELe7wzlQRp37FUKHLQtjF9xUYSTda48j7nubzpzj",
        }
      }
  
      axios.get('https://uael544tx8.execute-api.ap-northeast-2.amazonaws.com/prod/order', config)
        .then(response => {
            setOrders(response.data.Items);
            console.log(orders);
        })
        .catch(err => {
          window.alert("서버에 에러가 발생했습니다. 동일한 문제가 반복될 경우 문의 부탁드립니다.");
          console.log(err)
        })
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>상품명</TableCell>
                        <TableCell align="right">주문 번호</TableCell>
                        <TableCell align="right">옵션</TableCell>
                        <TableCell align="right">수량</TableCell>
                        <TableCell align="right">주문자 이름</TableCell>
                        <TableCell align="right">주문자 연락처</TableCell>
                        <TableCell align="right">주소</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell component="th" scope="row">
                            {order.itemName}
                        </TableCell>
                        <TableCell align="right">{order.id}</TableCell>
                        <TableCell align="right">{order.option}</TableCell>
                        <TableCell align="right">{order.count}</TableCell>
                        <TableCell align="right">{order.name}</TableCell>
                        <TableCell align="right">{order.phoneNumber}</TableCell>
                        <TableCell align="right">{order.address}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}
