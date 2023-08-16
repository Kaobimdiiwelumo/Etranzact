package com.net.code.repository;

import java.util.List;

import com.net.code.entity.Expense;
import com.net.code.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    public List<Expense> findByItem(String item);
    List<Expense> findByAmountGreaterThan(float amount);

    @Query("SELECT e FROM Expense e WHERE e.amount >= :amount")
    public List<Expense> listItemsWithPriceOver(@Param("amount") float amount);

    @Query("SELECT u FROM Users u WHERE u.id = ?1")
    public Users findByUserId(Long id);
}
