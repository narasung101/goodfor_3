package com.goodfor.web.customer;

import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.goodfor.web.pxy.Inventory;
import com.goodfor.web.pxy.Trunk;

@RestController
@RequestMapping("/customers")
public class CustomerCtrl {
	@Autowired Map<String, Object> map;
	@Autowired CustomerMapper customerMapper;
	@Autowired Inventory<Object> inventory;
	@Autowired Trunk<Object> trunk;
	@Autowired Customer customer;
	@PostMapping("/")
	public Map<?, ?> join(@RequestBody Customer param) {
		System.out.println("조인 param 값" + param.getCid() + ","  + param.getCpw() + ","  + param.getCname() + ","  
		+ param.getEmail() + ","  + param.getPnumber() + ","  + param.getInvest() + ","  + param.getRating());
		
		Consumer<Customer> consumer = t -> customerMapper.insertCustomerJoin(t);
		consumer.accept(param);
		trunk.clear();
		trunk.put("msg", "success");

		return trunk.get();
	}
	///customers/existid/'+$('#join_cid').val()
	@GetMapping("/existid/{cid}")
	public Map<?,?> existId(@PathVariable String cid){
		System.out.println("existID 값 cid 넘어옴" + cid);
		Function<String, Integer> function = t -> customerMapper.selectExistId(t);
	
		trunk.clear();
		trunk.put("msg", (function.apply(cid) != 0) ? "y" : "n");

		return trunk.get();
	}
	
	@PostMapping("/login")
	public Map<?, ?> login(@RequestBody Customer param) {
		System.out.println("로그인 param 값 넘어온 결과" + param.getCid() + "," + param.getCpw());
		Function<Customer, Customer> function = t -> customerMapper.selectCustomerLogin(t);
		customer = function.apply(param);
		String result = (customer != null) ? "success" : "fail";
		trunk.clear();
		trunk.put("msg", result);
		trunk.put("customer", customer);

		return trunk.get();
				
	}
	
//	@GetMapping("/cuslist/{cid}")
//	public Map<?, ?> customerList(@PathVariable String cid){
//		System.out.println("customerList 진입");
//		List<Customer> cuslist = service.selectAllCustomer();
//		System.out.println("service가 불러온 값" + cuslist.size());
//		map.clear();
//		map.put("msg", "success");
//		map.put("cuslist", cuslist);
//		
//		return map;
//		
//	}	
	

}
