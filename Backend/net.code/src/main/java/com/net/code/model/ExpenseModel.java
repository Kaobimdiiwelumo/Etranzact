package com.net.code.model;

import com.net.code.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseModel {
    private String item;
    private float amount;
    private Long userId;
}
