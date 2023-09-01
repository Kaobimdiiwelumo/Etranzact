package com.net.employee.Service;

import com.net.employee.Dto.EmployeeDto;
import com.net.employee.Model.Employee;
import com.net.employee.Model.User;
import com.net.employee.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService{
    @Autowired
    EmployeeRepository employeeRepository;
    @Override
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }
    @Override
    public void saveEmployee(EmployeeDto employeeDto){
        Employee newemployee = new Employee();
        newemployee.setFirstName(employeeDto.getFirstName());
        newemployee.setLastName(employeeDto.getLastName());
        newemployee.setEmail(employeeDto.getEmail());
        this.employeeRepository.save(newemployee);
    }
    @Override
    public void updateEmployee(Employee employee){
        Employee existingEmployee = employeeRepository.findById(employee.getId()).orElse(null);

        if (existingEmployee != null) {
            existingEmployee.setFirstName(employee.getFirstName());
            existingEmployee.setLastName(employee.getLastName());
            existingEmployee.setEmail(employee.getEmail());
            employeeRepository.save(existingEmployee);
        } else {
            // Handle the case where the employee doesn't exist
            // You can throw an exception or take appropriate action
        }
    }

    @Override
    public Employee getEmployeeById(long Id){
        Optional<Employee> optional = employeeRepository.findById(Id);
        Employee employee = null;
        if (optional.isPresent()) {
            employee = optional.get();
        } else {
            throw new RuntimeException(" Employee not found for id :: " + Id);
        }
        return employee;
    }
    @Override
    public void deleteEmployeeById(long Id){
        this.employeeRepository.deleteById(Id);
    }
    @Override
    public Page<Employee> findPaginated(int pageNo, int pageSize, String sortField, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        // Use "FirstName" instead of "firstName"
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort.by("FirstName"));
        return this.employeeRepository.findAll(pageable);
    }

}
