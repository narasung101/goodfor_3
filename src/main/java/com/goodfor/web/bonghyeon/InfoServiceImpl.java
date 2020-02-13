package com.goodfor.web.bonghyeon;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goodfor.web.pxy.PageProxy;
@Service
public class InfoServiceImpl implements InfoService {
	@Autowired InfoMapper mapper;
	@Override
	public void insertInfo(Info param) {
		mapper.insertInfo(param);
	}

	@Override
	public List<Info> changePageSize(PageProxy param) {
		return mapper.changePageSize(param);
	}

	@Override
	public int crawl1AllCount() {
		return mapper.crawl1AllCount();
	}

}
