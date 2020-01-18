// 패키지 IMPORT
const rp = require('request-promise');

// 네이버 검색 API KEY
const clientId = 'o4HY4geY37qR_mJopk_o';
const clientSecret = '3zmjXCI44f';


// ----- 네이버 책 검색
exports.searchBooks = (req, res) => {
  const naverQuery = req.query.query;
  const naverDisplay = req.query.display;
  const naverStart = req.query.start;
  const naverSort = req.query.sort;

  const api_url = `https://openapi.naver.com/v1/search/book.json?query=${encodeURI(naverQuery)}&display=${naverDisplay}&start=${naverStart}&sort=${naverSort}`;

  const options = {
    uri: api_url,
    headers: {
      'X-Naver-Client-Id': clientId, 
      'X-Naver-Client-Secret': clientSecret
    }
  };

  return rp(options)

}

