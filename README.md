# somalife

* SW Maestro 연수생들을 위한 생활 정보입니다.
* [swmaestro.github.io/somat](http://swmaestro.github.io/somat)에서 확인하실 수 있습니다.
* 기존의 somat 프로젝트와 D.CAMP의 [배동여지도](http://dcamp.kr/contents/views/188) 데이터를 기반으로 만들었습니다.
* Pull Request 는 언제나 환영합니다.

# 데이터

### 데이터 추가하기
---
* 데이터는 somalife.json에 저장됩니다.
* data array의 마지막에 데이터를 추가해주세요. 
	* **추가하시기 전에 콤마를 꼭 확인해주세요!**
* data는 다음 형식으로 구성되어 있습니다.
	* name : 업체명
	* content : 간단한 소개
	* x : 경도
	* y : 위도
	* tag : 태그 (태그 목록에서 해당되는 태그를 추가해주시면 됩니다.)

### 팁
---
* 좌표는 네이버 / 다음 지도에서 업체명을 검색하신 다음 주소를 구글 지도에서 검색하시면 편하게 추가하실 수 있습니다.

# 태그

### [미완성] 태그 추가하기
---
* 태그는 Unique한 값이여야 합니다. (절대 중복되면 안됨)
	* 아래 태그 목록에서 겹치는게 있는지 확인해주세요.
* 추가하실 태그를 태그 목록에 추가하시고, index.html을 다음과 같이 수정해주세요.

### 태그 목록
---
* 음식점
	* \#한식
	* \#중식
	* \#일식
	* \#양식
	* \#패스트푸드
	* \#분식
	* \#기타
	* 데이터 소스 (필수)
		* **앞으로 추가되는 정보는 \#somalife 태그를 달아주세요.**
		* \#somalife 
		* \#somat
		* \#배동여지도
	* 가격대
		* \#비싼
		* \#보통
		* \#싼
	* 맛
		* \#매운
	* 기타
		* \#멘토링추천
		* \#불백
		* \#국물
		* \#푸드코트
		* \#24시간
* 문화
	* \#영화관
	* \#노래방
	* \#공원
* 생활
	* \#병원
	* \#약국 

# Contributors

[![darjeeling](https://avatars0.githubusercontent.com/u/52967?v=2&s=100)](https://github.com/darjeeling)
[![item4](https://avatars0.githubusercontent.com/u/559952?v=2&s=100)](https://github.com/item4)
[![raonism](https://avatars0.githubusercontent.com/u/3397808?v=2&s=100)](https://github.com/raonism)
[![dobestan](https://avatars0.githubusercontent.com/u/4688315?v=2&s=100)](https://github.com/dobestan)
[![LyuGGang](https://avatars0.githubusercontent.com/u/5120987?v=2&s=100)](https://github.com/LyuGGang)
[![disjukr](https://avatars0.githubusercontent.com/u/690661?v=2&s=100)](https://github.com/disjukr)
[![wikibootup](https://avatars2.githubusercontent.com/u/6479173?v=2&s=100)](https://github.com/wikibootup)
[![devholic](https://avatars1.githubusercontent.com/u/6194958?v=2&s=100)](https://github.com/devholic)
[![Luavis](https://avatars3.githubusercontent.com/u/1534596?v=2&s=100)](https://github.com/Luavis)
