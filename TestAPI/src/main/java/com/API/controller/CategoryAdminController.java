package com.API.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.API.DTO.ShopReportRequest;
import com.API.model.Category;
import com.API.model.ProductImage;
import com.API.model.ShopReport;
import com.API.repository.CategoryRepository;
import com.API.service.CategoryAdminService;
import com.API.utils.ObjectRespone;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import io.jsonwebtoken.io.IOException;

@RestController
@CrossOrigin("*")
public class CategoryAdminController {

	@Autowired
	CategoryAdminService categoryAdminService;
	
	@Autowired 
	CategoryRepository categoryRepository;
	
	@Autowired
    private Cloudinary cloudinary;

	@GetMapping("/admin/getAllCategories")
	public ResponseEntity<Page<Object[]>> getDanhMucTheoCay(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {
		Pageable pageable = PageRequest.of(page, size);

		// Gọi service để lấy danh sách danh mục theo cây
		Page<Object[]> categories = categoryAdminService.getDanhMucTheoCay(pageable);

		return ResponseEntity.ok(categories);
	}
	
	@GetMapping("/admin/roots")
    public ResponseEntity<?> getRootCategories() {
        List<Map<String, Object>> rootCategories = categoryAdminService.getRootCategories();
        return ResponseEntity.ok(rootCategories);
    }

    // API lấy danh mục con dựa trên id danh mục cha
    @PostMapping("/admin/subcategories")
    public ResponseEntity<?> getSubCategories(@RequestParam Integer parentId) {
        List<Map<String, Object>> subCategories = categoryAdminService.getSubCategories(parentId);
        return ResponseEntity.ok(subCategories);
    }
    
    @PostMapping("/admin/createCategory")
    public ResponseEntity<String> saveCategory(@RequestParam("files") MultipartFile[] files, 
                                               @RequestParam("categoryName") String categoryName, 
                                               @RequestParam("parent_Id") Integer parentId) throws IOException, java.io.IOException {
        // Tạo đối tượng Category mới
        Category category = new Category();
        category.setTenLoai(categoryName);  // Gán tên danh mục
        Optional<Category> categoryOptional = categoryRepository.findById(parentId);
        if (categoryOptional.isPresent()) {
            Category parentCategory = categoryOptional.get(); // Lấy giá trị nếu tồn tại
            category.setParentCategory(parentCategory);
        } else {
            // Xử lý trường hợp không tìm thấy danh mục cha
            category.setParentCategory(null);
        }



        // Tạo danh sách để lưu các URL ảnh
        List<String> imageUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                // Upload ảnh lên Cloudinary
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                String imageUrl = uploadResult.get("url").toString();
                imageUrls.add(imageUrl);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                     .body("File upload failed: " + e.getMessage());
            }
        }

        // Gán danh sách ảnh vào Category
        category.setAnhLoai(String.join(",", imageUrls));  // Nếu bạn muốn lưu danh sách URL dưới dạng chuỗi

        category.setTrangThai(1); // Ví dụ, đặt trạng thái là 1 (hoạt động)

        // Thêm danh mục vào cơ sở dữ liệu
        int result = categoryAdminService.addTheLoai(category);
        if (result > 0) {
            return ResponseEntity.ok("Category created successfully with ID: " + result);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Category creation failed.");
        }
    }

    


}
