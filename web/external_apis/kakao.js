// 패키지 IMPORT
const rp = require('request-promise');

// 카카오 검색 API KEY
const kakaoAPIKey = 'c2b1e561719d5ebaa23081c3e8e48fee';


// ----- 카카오 책 검색
exports.searchBooks = (req, res) => {

  const kakaoQuery = req.query.query;
  const kakaoSort = req.query.sort;
  const kakaoPage = req.query.page;
  const kakaoSize = req.query.size;
  const kakaoTarget = req.query.target;
  
  const api_url = `https://dapi.kakao.com/v3/search/book?query=${encodeURI(kakaoQuery)}&sort=${kakaoSort}&page=${kakaoPage}&size=${kakaoSize}&target=${kakaoTarget}`;
  
  const options = {
    uri: api_url,
    headers: {
      'Authorization': `KakaoAK ${kakaoAPIKey}`
    }
  }
  
  return rp(options);
}

