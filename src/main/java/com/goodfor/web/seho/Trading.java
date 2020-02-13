package com.goodfor.web.seho;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
public class Trading {
	private String
	seq, sname, nprice, pcompare, frate, volume, sprice, hprice, lprice, sellprice, purchaseprice;
	
}
