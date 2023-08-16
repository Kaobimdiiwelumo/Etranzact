package com.net.code.controller;

import com.net.code.entity.Expense;
import com.net.code.entity.Users;
import com.net.code.model.ExpenseModel;
import com.net.code.repository.ExpenseRepository;
import com.net.code.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    @Autowired
    public ExpenseController(ExpenseRepository expenseRepository, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        return expenseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Expense>> getExpenseByUserId(@PathVariable Long id) {
        Users exist = expenseRepository.findByUserId(id);
        if (exist == null) {
            return ResponseEntity.notFound().build();
        }

        List<Expense> expenses = new ArrayList<>(exist.getExpenses());
        return ResponseEntity.ok(expenses);
    }


//    @PostMapping("/add")
//    public String createExpense(@RequestBody ExpenseModel expenseModel) {
//        Users user = expenseRepository.findByUserId(expenseModel.getUserId());
//        if (user == null){
//            return "user id not found";
//        }
//
//        Expense expense = new Expense();
//        expense.setUsers(user); // Set the user for the expense
//        expense.setAmount(expenseModel.getAmount());
//        expense.setItem(expenseModel.getItem());
//        expense.setId(expenseModel.getUserId());
//        expenseRepository.save(expense);
//        return "expense created successfully";
//    }
@PostMapping("/add")
public String createExpense(@RequestBody ExpenseModel expenseModel) {
    Users user = expenseRepository.findByUserId(expenseModel.getUserId());
    if (user == null) {
        return "user id not found";
    }

    Expense expense = new Expense();
    expense.setUsers(user);
    expense.setAmount(expenseModel.getAmount());
    expense.setItem(expenseModel.getItem());
    expenseRepository.save(expense);
    return "expense created successfully";
}



    @PatchMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense updatedExpense) {
        return expenseRepository.findById(id)
                .map(existingExpense -> {
                    existingExpense.setItem(updatedExpense.getItem());
                    existingExpense.setAmount(updatedExpense.getAmount());
                    return ResponseEntity.ok(expenseRepository.save(existingExpense));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{item}")
    public ResponseEntity<Void> deleteExpense(@PathVariable String item) {
        List<Expense> expenses = expenseRepository.findByItem(item);
        if (!expenses.isEmpty()) {
            expenseRepository.deleteAll(expenses);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
