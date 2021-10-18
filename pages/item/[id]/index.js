import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Typography, Container, Button, TextField, MenuItem } from '@material-ui/core';
import { Header, Footer } from '../../../components';
import { ConfirmModal } from '../../../units';
import axios from 'axios';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: 10,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
    marginRight: -drawerWidth,
  },
  mainPaper: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    flexFlow: 'row wrap',
    flexGrow: '1',
    padding: '10px'
  },
  mainImageBox: {
    // width: '100%'
    flex: '1.4 0 400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainImage: {
    maxWidth: '400px',
    maxHeight: '400px',
    width: '75vw',
    height: '75vw',
  },
  itemInfo: {
    flex: '1 0 400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    padding: '10px'
  },
  itemName: {
    width: '100%',
  },
  itemDetail: {
    // minHeight: '160px',
    padding: '20px 0'
  },
  orderBox: {
    width: '100%',
    maxWidth: '600px',
    margin: '20px auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  orderBoxFold: {
    display: 'none'
  },
  contentDescription: {
    padding: '30px 40px',
    textAlign: 'center'
  },
  option: {
    paddingBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  optionTextField: {
    minWidth: '160px',
    width: '45%',
    textAlign: 'center',
    "& input": {
      textAlign: 'center'
    }
  },
  price: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '20px'
  },
  orderDetail: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: '20px 0',
    flexDirection: 'column',
    maxWidth: '600px',
  },
  orderDetailBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'row wrap',
  },
  senderTextField: {
    flexGrow: '1',
    "& input": {
      flex: '1 1 200px'
    },
    maxWidth: '250px'
  }
}));



export default function Item() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(true);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [completeOrder, setCompleteOrder] = useState(false);

  const [orderInfo, setOrderInfo] = useState({ option: '', count: '1', name: '', phoneNumber: '', address: '' })
  const [validation, setValidation] = useState(false);

  const handleOrderInfoChange = e => {
    const { name, value } = e.target;
    setOrderInfo(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const validateOrderInfo = type => {
    console.log(orderInfo["count"])
    if (type === 1) {
      return orderInfo["option"].length !== 0 && isNormalInteger(orderInfo["count"]);
    }
    if (type === 2) {
      return ["option", "name", "phoneNumber", "address"].filter(key => orderInfo[key].length === 0).length === 0 && isNormalInteger(orderInfo["count"]);
    }
  }

  const handleOrder = () => {
    
    const config = {
      headers: {
        "x-api-key": "ELe7wzlQRp37FUKHLQtjF9xUYSTda48j7nubzpzj",
      }
    }

    axios.post('https://uael544tx8.execute-api.ap-northeast-2.amazonaws.com/prod/order', { ...orderInfo, itemName: '또시온, 청귤' }, config)
      .then(response => {
        setCompleteOrder(true);
        setOrderInfo(response.data);
        console.log(response)
      })
      .catch(err => {
        window.alert("서버에 에러가 발생했습니다. 동일한 문제가 반복될 경우 문의 부탁드립니다.");
        console.log(err)
        handleConfirmModalClose();
      })
  }

  const handleConfirmModalClose = () => {
    setOrderInfo({ size: '', count: '1', name: '', phoneNumber: '', address: '' });
    setConfirmModalOpen(false);
    setValidation(false);
    setCompleteOrder(false);
    setOrderOpen(!orderOpen);
  }

  const isNormalInteger = (str) => {
    const n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n > 0;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <Header open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} /> 
      </div>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Container>
          <div className={classes.mainPaper}>
            <div className={classes.mainImageBox}>
              <img src="https://source.unsplash.com/random" className={classes.mainImage}/>
            </div>
            <div className={classes.itemInfo}>
              <div className={classes.itemName}>
                <Typography gutterBottom align="center" variant="h5" component="h2"> 
                  <strong>또시온, 풋귤</strong>
                </Typography>
              </div>
              <Typography className={classes.itemDetail}>
                올해는 특별히 '친환경인증' 을 받은 친환경풋귤(친환경청귤) 까지 예약을 받고 있습니다☺️ 또시온 풋귤은 인기 만점💚크기_ S/M/L 혼합 사이즈 올해는 특별히 '친환경인증' 을 받은 친환경풋귤(친환경청귤) 까지 예약을 받고 있습니다☺️ 또시온 풋귤은 인기 만점💚크기_ S/M/L 혼합 사이즈
              </Typography>
              <div className={classes.option}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="옵션"
                  margin="dense"
                  variant="standard"
                  name="option"
                  className={classes.optionTextField}
                  value={orderInfo.option}
                  error={validation && orderInfo["option"].length === 0}
                  helperText={(validation && orderInfo["option"].length === 0) && "옵션을 작성해주세요."}
                  onChange={handleOrderInfoChange}
                >
                  {["S", "M", "L"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-currency"
                  label="수량"
                  variant="standard"
                  margin="dense"
                  type="number"
                  name="count"
                  value={orderInfo.count}
                  error={validation && !isNormalInteger(orderInfo["count"])}
                  helperText={(validation && !isNormalInteger(orderInfo["count"])) && "수량을 작성해주세요."}
                  onChange={handleOrderInfoChange}
                  className={classes.optionTextField} />
              </div>
              <div className={classes.price}>
                <Typography variant="h6" component="span">
                  상품 금액
                </Typography>
                <Typography variant="h6" component="span">15000원</Typography>
              </div>
              <Button variant="outlined" color="primary" onClick={() => { setValidation(true); if (validateOrderInfo(1)) { setOrderOpen(!orderOpen); setValidation(false); } }}>
                { orderOpen ? "주문하기" : "취소" }
              </Button>
            </div>
          </div>
          <div className={clsx(classes.orderBox, {
            [classes.orderBoxFold]: orderOpen,
          })}>
            <div className={classes.orderDetail}>
                <Typography variant="h6">배송자 정보</Typography>
                <div className={classes.orderDetailBox}>
                  <TextField
                    label="성명"
                    variant="standard"
                    margin="dense"
                    value={orderInfo.name}
                    name="name"
                    error={validation && orderInfo["name"].length === 0}
                    helperText={(validation && orderInfo["name"].length === 0) && "이름을 작성해주세요."}
                    className={classes.senderTextField}
                    onChange={handleOrderInfoChange}
                  />
                  <TextField
                    label="연락처"
                    helperText="숫자만 작성해주세요."
                    variant="standard"
                    margin="dense"
                    type="number"
                    name="phoneNumber"
                    error={validation && orderInfo["phoneNumber"].length === 0}
                    helperText={(validation && orderInfo["phoneNumber"].length === 0) && "연락처를 작성해주세요."}
                    value={orderInfo.phoneNumber}
                    className={classes.senderTextField}
                    onChange={handleOrderInfoChange}
                  />
                </div>
                <TextField
                  label="주소"
                  variant="standard"
                  margin="dense"
                  name="address"
                  error={validation && orderInfo["address"].length === 0}
                  helperText={(validation && orderInfo["address"].length === 0) && "주소를 작성해주세요."}
                  value={orderInfo.address}
                  onChange={handleOrderInfoChange}
                />
              </div>
              <Button variant="outlined" color="primary" onClick={() => { setValidation(true); if (validateOrderInfo(2)) { setCompleteOrder(false); setConfirmModalOpen(true); } }}>완료</Button>
          </div>
          <ConfirmModal
            open={confirmModalOpen}
            handleClose={handleConfirmModalClose}
            orderInfo={orderInfo}
            handleOrder={handleOrder}
            completeOrder={completeOrder}
          />
          <div className={classes.contentDescription}>
                      벌써 풋귤 예약이 줄을 서네요!<br/>

            2월부터 주문이...!! 늘 사랑해주셔서 감사합니다!<br/>

            올해는 특별히 '친환경인증' 을 받은<br/>

            친환경풋귤(친환경청귤) 까지<br/>
            <br/>
            예약을 받고 있습니다☺️<br/>
            <br/>
            또시온 풋귤은 인기 만점💚<br/>
            <br/>
            ​<br/>
            <br/>
            저는 집에서 조금만 만들고 싶은데요??<br/>
            <br/>
            ​<br/>
            <br/>
            하시는 분들을 위해<br/>
            <br/>
            [친환경풋귤수제청키트] 까지 준비되어 있으니<br/>
            <br/>
            500g / 1kg / 2kg / 5kg 까지 다양하게<br/>
            <br/>
            친환경풋귤 까지 준비했는데 <br/>
            <br/>
            아무설탕이나 쓸 수 없잖아요?🤔<br/>
            <br/>
            몸에 좋고 맛있는 <br/>
            <br/>
            올고마켓 비정제설탕/유기농설탕 도!!<br/>
            <br/>
            또시 정말 섬세하게 준비했으니<br/>
            <br/>
            얼마든 문의 주세용💚💚<br/>
            <br/>
            ​<br/>
            <br/>
            ✅크기_ S/M/L 혼합 사이즈<br/>
            <br/>
            또시가 또 알쥐 수제청 담가봐서 RG<br/>
            <br/>
            이거 진짜 너무 작으면 자르다 열 뻗치고<br/>
            <br/>
            기계 있어도 화나는거 아시죠?<br/>
            <br/>
            작으면 과즙 없는거 아시죠?<br/>
            <br/>
            또시가 정말 아무리 힘들어도 이거 맞추겠다고<br/>
            <br/>
            3000평짜리 밭에서 3박스 땄자나...<br/>
            <br/>
            또 너무 크면 안예쁜거 RGRG?!<br/>
            <br/>
            ​<br/>
            <br/>
            ✅색깔<br/>
            <br/>
            이거 또 또시가 기가막힐 수밖에 없자나,,<br/>
            <br/>
            초록초록해야 예쁜거자나,,<br/>
            <br/>
            당일 아침에 수확해 발송하는거<br/>
            <br/>
            이거 진짜 아무나 하는거 아니거든요ㅜ.ㅜ<br/>
            <br/>
            우리 고객님들 니즈 100프로 아니 1000프로<br/>
            <br/>
            또시가 맞추려고 정말 노력하는데<br/>
            <br/>
            이런 또시맘 아시나요..?🧡🧡🧡<br/>
            <br/>
            냉장보관 하고 뭐 비닐에 넣고 해서 보내면<br/>
            <br/>
            색이 안변하고 어쩌구<br/>
            <br/>
            복잡할 필요 없이 그냥 당일 수확 당일 배송<br/>
            <br/>
            그럼 되는거 아니겠어요??<br/>
            <br/>
            ​<br/>
            <br/>
            단! 우리 똑 소리 나는 고객님들 중에 그런 분 없겠지만~<br/>
            <br/>
            풋귤은 시간이 지나면 순식간에 색이 변해요!<br/>
            <br/>
            또시가 아무리 빨리 보내도<br/>
            <br/>
            우리 고객님들이 바로 오픈 부탁드리고<br/>
            <br/>
            색이 변하는 풋귤이들을 보장할 수 없어요~<br/>
            <br/>
            ​<br/>
            <br/>
            문의는 인스타dm 혹은 카톡플친또시온<br/>
            <br/>
            혹은 비밀댓글 부탁드려용!<br/>
            <br/>
            ​<br/>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
