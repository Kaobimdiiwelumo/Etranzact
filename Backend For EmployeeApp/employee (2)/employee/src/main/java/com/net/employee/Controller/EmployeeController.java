package com.net.employee.Controller;

import com.net.employee.Dto.EmployeeDto;
import com.net.employee.Model.Employee;
import com.net.employee.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    // display list of employees
    @GetMapping("/list")
    public  List<Employee>  showEmployee(Model model) {
//        System.out.println("hit");
//        return "hit";
       return findPaginated(1, "FirstName", "asc", model);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Employee>getEmployeeById(@PathVariable Long id) {
        Employee exists = employeeService.getEmployeeById(id);
        if(exists == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(exists);
    }


    @GetMapping("/showNewEmployeeForm")
    public String showNewEmployeeForm(Model model) {
        // create model attribute to bind form data
        Employee employee = new Employee();
        model.addAttribute("employee", employee);
        return "new_employee";
    }

    @PostMapping("/saveEmployee")

    public String saveEmployee(@RequestBody EmployeeDto employeeDto) {
        // save employee to database
        employeeService.saveEmployee(employeeDto);
        return "successful";
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<String> updateEmployee(@PathVariable(value = "id") long id, @RequestBody Employee employee) {
        Employee existingEmployee = employeeService.getEmployeeById(id);

        if (existingEmployee != null) {
            existingEmployee.setFirstName(employee.getFirstName());
            existingEmployee.setLastName(employee.getLastName());
            existingEmployee.setEmail(employee.getEmail());
            // Map data from EmployeeDto to existing Employee
            employeeService.updateEmployee(existingEmployee);
            return ResponseEntity.ok().body("Employee updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @DeleteMapping("/deleteEmployee/{id}")
    public String deleteEmployee(@PathVariable (value = "id") long id) {

        // call delete employee method
        this.employeeService.deleteEmployeeById(id);
        return "redirect:/";
    }


    @GetMapping()
    public  List<Employee>  findPaginated(@PathVariable (value = "pageNo") int pageNo,
                                @RequestParam("sortField") String sortField,
                                @RequestParam("sortDir") String sortDir,
                                Model model) {
        int pageSize = 5;

        Page<Employee> page = employeeService.findPaginated(pageNo, pageSize, sortField, sortDir);
        List<Employee> listEmployees = page.getContent();

        model.addAttribute("currentPage", pageNo);
        model.addAttribute("totalPages", page.getTotalPages());
        model.addAttribute("totalItems", page.getTotalElements());

        model.addAttribute("sortField", sortField);
        model.addAttribute("sortDir", sortDir);
        model.addAttribute("reverseSortDir", sortDir.equals("asc") ? "desc" : "asc");

        model.addAttribute("listEmployees", listEmployees);
        return listEmployees;
    }
}
