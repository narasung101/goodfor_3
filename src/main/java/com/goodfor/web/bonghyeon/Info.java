package com.goodfor.web.bonghyeon;

import org.springframework.stereotype.Component;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
public class Info {
	private String 
		seq, company, nowPrice, highPrice, lowPrice, numChange, perChange, trade;
	}