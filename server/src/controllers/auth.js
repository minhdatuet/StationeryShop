const authService = require('../services/auth.js');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const db = require('../models'); // đường dẫn tới models của bạn
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('dotenv').config()

exports.login = async (req, res) => {
    const {accountPhone, accountPassword} = req.body
    try{
        if(!accountPhone || !accountPassword) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' 
        })
        const response = await authService.loginService(req.body)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller login ' + error
        })
    }
}

exports.createAccount = async (req, res) => {
    const {accountName, accountPhone, accountEmail, accountPassword, accountAddress, accountType} = req.body
    try{
        // return accountName
        if(!accountName || !accountPhone ||!accountEmail || !accountPassword || !accountAddress || !accountType) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' + (!accountName ? "accountName " : " ") + (!accountPhone ? "accountPhone " : " ") + (!accountEmail ? "accountEmail " : " ") 
                                + (!accountPassword ? "accountPassword " : " ") + (!accountAddress ? "accountAddress " : " ")
                                + (!accountType ? "accountType " : " ")
        })
        const response = await authService.registerService(req.body)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller createAccount ' + error
        })
    }
}


exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
      if (typeof token !== 'string') {
          throw new Error('Token không phải là chuỗi');
      }

      // Xác thực token của Google
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { name, email, picture } = ticket.getPayload();

      // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
      let user = await db.Account.findOne({ where: { accountEmail: email } });

      if (!user) {
          // Lưu thông tin người dùng vào phiên để hoàn thiện thông tin
          req.session.googleUser = { name, email, picture };
          console.log('Phiên sau khi thiết lập googleUser:', req.session);

          req.session.save(err => {
              if (err) {
                  console.error('Lỗi lưu phiên:', err);
                  return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
              }
              return res.json({ needAdditionalInfo: true });
          });
      } else {
          // Tạo JWT token
          const accessToken = jwt.sign({ id: user.id, email: user.accountEmail }, process.env.SECRET_KEY, { expiresIn: '2d' });

          res.json({ accessToken, user });
      }
  } catch (error) {
      console.error('Xác thực token của Google thất bại:', error);
      res.status(401).json({ error: 'Token Google không hợp lệ' });
  }
};

exports.completeProfile = async (req, res) => {
  const { accountPhone, accountAddress } = req.body;
  const googleUser = req.session.googleUser;

  if (!googleUser) {
      return res.status(400).json({ error: 'Thiếu thông tin người dùng Google' });
  }

  try {
      // Tạo tài khoản mới với thông tin bổ sung
      const user = await db.Account.create({
          accountName: googleUser.name,
          accountPhone: accountPhone,
          accountEmail: googleUser.email,
          accountPassword: '', // Không cần mật khẩu cho Google login
          accountType: 'CUSTOMER',
          accountAddress: accountAddress,
      });

      // Tạo JWT token
      const accessToken = jwt.sign({ id: user.id, email: user.accountEmail }, process.env.SECRET_KEY, { expiresIn: '2d' });

      res.json({ accessToken, user });
  } catch (error) {
      res.status(500).json({ error: 'Hoàn thiện hồ sơ thất bại' });
  }
};


