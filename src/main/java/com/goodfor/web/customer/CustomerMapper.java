package com.goodfor.web.customer;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface CustomerMapper {

	public int customerCount();
	public void insertCustomerJoin(Customer param);
	public int selectExistId(String cid);
	public Customer selectCustomerLogin(Customer param);
	public List<Customer> selectAllCustomer();
		
}