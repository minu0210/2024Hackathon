export const protectorMiddleware = (req, res, next) => {
  if(req.session._id) next();
  else res.send('<script>alert("로그인 후 이용 가능합니다."); location.href = "/"</script>');
}