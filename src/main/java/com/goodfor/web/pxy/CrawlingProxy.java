package com.goodfor.web.pxy;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.goodfor.web.bonghyeon.Info;
import com.goodfor.web.bonghyeon.InfoMapper;

@Component("crawler")
public class CrawlingProxy extends Proxy {
	@Autowired Box<String> box;
	@Autowired Inventory<HashMap<String, String>> inventory;
	@Autowired
	PageProxy pager;
	@Autowired Info info;
	@Autowired InfoMapper infoMapper;
	
	
	public ArrayList<HashMap<String, String>> crawling(){
		box.clear();
		System.out.println("박스 크롤링 시작 지점");
		try {
			Document rawData = Jsoup.connect
					("https://music.bugs.co.kr/recomreview?&order=listorder&page=2")
					.timeout(10*1000).get();
			Elements artist = rawData.select("div[class=recommendItem]"); 
			HashMap<String, String> map = null;
			for(Element e : artist) {
				map = new HashMap<>();
				map.put("list", e.text()+"\n ************** \n");
				inventory.add(map);
				System.out.println("크롤링 확인" + e.text());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return inventory.get();
	}
	
	public ArrayList<HashMap<String, String>> bugsCrawling() {
		inventory.clear();
		try {
			final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36";
			String bugsurl = "https://music.bugs.co.kr/chart";
			Connection.Response homePage = Jsoup.connect(bugsurl).method(Connection.Method.GET).userAgent(USER_AGENT)
					.execute();
			Document temp = homePage.parse();
			Elements thumbnail = temp.select("a.thumbnail");
			Elements title = temp.select("p.title");
			Elements artist = temp.select("p.artist");
			HashMap<String, String> map = null;
		
			for (int i=0; i < title.size(); i++) {
				map = new HashMap<>();
				map.put("seq", string(i+1));
				map.put("title", title.get(i).text());
				map.put("artist", artist.get(i).text());
				map.put("thumbnail", thumbnail.get(i).select("img").attr("src"));
				inventory.add(map);
			}
		} catch (Exception e) {
		}
		System.out.println("********************크롤링결과********************");
		inventory.get().forEach(System.out :: println);
		return inventory.get();
	}
	
	@Transactional
	public ArrayList<HashMap<String, String>> crawling1(){
		inventory.clear();
		try {
			final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36";
			String top = "https://www.investing.com/equities/americas";
			Connection.Response homePage;
			homePage = Jsoup.connect(top) 
					.method(Connection.Method.GET) 
					.userAgent(USER_AGENT) 
					.execute();
			Document temp = homePage.parse();
			Elements elements = temp.select("table#cross_rate_markets_stocks_1 tbody tr");
			Elements first = elements.select("td");
			inventory.clear();

			HashMap<String, String> map = null;
			for (int i=0; i <first.size();i+=10) {
				map = new HashMap<>();
				map.put("first1", first.get(i+1).text());
				map.put("second1", first.get(i+2).text());
				map.put("third1", first.get(i+3).text());
				map.put("fourth1", first.get(i+4).text());
				map.put("fifth1", first.get(i+5).text());
				map.put("sixth1", first.get(i+6).text());
				map.put("seventh1", first.get(i+7).text());
				inventory.add(map);				
				info.setCompany(first.get(i+1).text());
				info.setNowPrice(first.get(i+2).text());
				info.setHighPrice(first.get(i+3).text());
				info.setLowPrice(first.get(i+4).text());
				info.setNumChange(first.get(i+5).text());
				info.setPerChange(first.get(i+6).text());
				info.setTrade(first.get(i+7).text());
				infoMapper.insertInfo(info);
				System.out.println(info);
				System.out.println("여기는 역시 안 찍히지?");
				
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return inventory.get();	
	}

	public ArrayList<HashMap<String, String>> crawling2(){
		inventory.clear();
		try {
			final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36";
			String top = "https://kr.investing.com/equities/south-korea";
			Connection.Response homePage;
			homePage = Jsoup.connect(top) 
					.method(Connection.Method.GET) 
					.userAgent(USER_AGENT) 
					.execute();
			Document temp = homePage.parse();
			Elements elements = temp.select("table#cross_rate_markets_stocks_1 tbody tr");
			Elements first2 = elements.select("td");
			inventory.clear();
			HashMap<String, String> map = null;
			for (int i=0; i <first2.size();i+=10) {
				map = new HashMap<>();
				map.put("first2", first2.get(i+1).text());
				map.put("second2", first2.get(i+2).text());
				map.put("third2", first2.get(i+3).text());
				map.put("fourth2", first2.get(i+4).text());
				map.put("fifth2", first2.get(i+5).text());
				map.put("sixth2", first2.get(i+6).text());
				map.put("seventh2", first2.get(i+7).text());
				inventory.add(map);				
			}
			
		} catch (Exception e2) {
			e2.printStackTrace();
		}
		return inventory.get();
	}
	public ArrayList<HashMap<String, String>> crawling3(){
		inventory.clear();
		try {
			final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36";
			String news = "https://news.naver.com/main/list.nhn?sid2=258&sid1=101&mid=shm&mode=LS2D&date=20170425&page=3" ;
			Connection.Response homePage;
			homePage = Jsoup.connect(news) 
					.method(Connection.Method.GET) 
					.userAgent(USER_AGENT) 
					.execute();
			Document temp = homePage.parse();
			Elements element = temp.select("ul.type06_headline");    
			Elements tempforTitle = element.select("li dl dt");
			inventory.clear();
			HashMap<String, String> map = null;
			for (int i=0; i <tempforTitle.size(); i+=2) {
				map = new HashMap<>();
				map.put("tempforTitle", tempforTitle.get(i).text());
				inventory.add(map);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		/*
		 * System.out.println("3333------- 크롤링 결과 ----------333");
		 * inventory.get().forEach(System.out :: println);
		 */
		return inventory.get();	
	}	
	public ArrayList<HashMap<String, String>> crawling4(){
		inventory.clear();
		try {
			final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36";
			String top = "https://kr.investing.com/equities/united-states";
			Connection.Response homePage;
			homePage = Jsoup.connect(top) 
					.method(Connection.Method.GET) 
					.userAgent(USER_AGENT) 
					.execute();
			Document temp = homePage.parse();
			Elements elements = temp.select("table#cross_rate_markets_stocks_1 tbody tr");
			Elements first4 = elements.select("td");
			inventory.clear();
			HashMap<String, String> map = null;
			for (int i=0; i <first4.size();i+=10) {
				map = new HashMap<>();
				map.put("first4", first4.get(i+1).text());
				map.put("second4", first4.get(i+2).text());
				map.put("third4", first4.get(i+3).text());
				map.put("fourth4", first4.get(i+4).text());
				map.put("fifth4", first4.get(i+5).text());
				map.put("sixth4", first4.get(i+6).text());
				map.put("seventh4", first4.get(i+7).text());
				inventory.add(map);				
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return inventory.get();
	}
	
	public ArrayList<HashMap<String, String>> naverCrawling(){
		String url = "https://finance.naver.com/sise/sise_rise.nhn?sosok=0";
		inventory.clear();
		try {
			Document rawData = Jsoup.connect(url).timeout(10*1000).get();
			Elements stockinfo = rawData.select("div[class=box_type_l] tbody tr");
			Elements sname = stockinfo.select("td");
			HashMap<String, String> map = null;
			for(int i=0; i< 3; i++) {
				map = new HashMap<>();
				map.put("stockinfo",stockinfo.get(i).text());
				map.put("sname", sname.get(i).text());
				inventory.add(map);
			}
//			System.out.println("inventory에 담긴 값 : " + inventory);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("===== 크롤링 결과 =====");
		inventory.get().forEach(System.out :: println);
		return inventory.get();
	}
	
}
