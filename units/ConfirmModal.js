import React from 'react';
import { Modal, Backdrop, Fade, Button, Divider, Table, TableBody, TableRow, TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';            

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '90%',
    maxWidth: '700px'
  },
  buttonWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
  },
  sendButton: {
    flex: '1',
  }
}));

const ConfirmModal = ({ open, handleClose, orderInfo, handleOrder, completeOrder }) => {
    const classes = useStyles();

    return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">{!completeOrder ? "주문 확인" : "주문 완료"}</h2>
              <div>
                { completeOrder && "주문이 접수되었습니다. 신한 110-412-137971 오윤선 좌에 작성해주신 입금자 명으로 입금해주시면 주문이 완료됩니다."}
                <OrderDetail orderInfo={orderInfo} completeOrder={completeOrder} />
              </div>
              <div className={classes.buttonWrapper}>
                {!completeOrder ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.sendButton}
                    onClick={handleOrder}
                  > 
                    상품 주문
                  </Button> 
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.sendButton}
                    onClick={handleClose}
                  > 
                    닫기
                  </Button> 
                )}
                
              </div>
            </div>
          </Fade>
        </Modal>
    );
}

const OrderDetail = ({ orderInfo, completeOrder }) => (
  <Table aria-label="simple table" size="small">
    <TableBody>
      {completeOrder && (
        <TableRow>
          <TableCell component="th" scope="row">
            주문 번호
          </TableCell>
          <TableCell align="right">{orderInfo.id}</TableCell>
        </TableRow>
      )}
      <TableRow>
        <TableCell component="th" scope="row">
          상품명
        </TableCell>
        <TableCell align="right">또시온, 풋귤</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          옵션
        </TableCell>
        <TableCell align="right">{orderInfo.option}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          수량
        </TableCell>
        <TableCell align="right">{orderInfo.count}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          이름
        </TableCell>
        <TableCell align="right">{orderInfo.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          연락처
        </TableCell>
        <TableCell align="right">{orderInfo.phoneNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          주소
        </TableCell>
        <TableCell align="right">{orderInfo.address}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default ConfirmModal;