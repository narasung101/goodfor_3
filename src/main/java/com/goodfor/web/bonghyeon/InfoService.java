package com.goodfor.web.bonghyeon;

import java.util.List;

import org.springframework.stereotype.Component;

import com.goodfor.web.pxy.PageProxy;

@Component
public interface InfoService {
	public void insertInfo(Info param);
	public List<Info> changePageSize(PageProxy param);
	public int crawl1AllCount();

}
