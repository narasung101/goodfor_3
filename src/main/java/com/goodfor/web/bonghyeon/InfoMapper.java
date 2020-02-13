package com.goodfor.web.bonghyeon;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.goodfor.web.pxy.PageProxy;


@Repository
public interface InfoMapper {
	public void insertInfo(Info param);
	public List<Info> changePageSize(PageProxy param);
	public int crawl1AllCount();

}
