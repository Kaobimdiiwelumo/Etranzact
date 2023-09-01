package com.net.employee.Service;

import com.net.employee.Dto.EmployeeDto;
import com.net.employee.Model.Employee;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    void saveEmployee(EmployeeDto employeeDto);
    void updateEmployee(Employee employee);
    Employee getEmployeeById(long id);
    void deleteEmployeeById(long id);
    Page<Employee> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection);

}
