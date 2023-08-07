package net.code.java.controller;

import net.code.java.expense.Expense;
import net.code.java.expense.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseController(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
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

    @PostMapping("/add")
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        return ResponseEntity.ok(expenseRepository.save(expense));
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
