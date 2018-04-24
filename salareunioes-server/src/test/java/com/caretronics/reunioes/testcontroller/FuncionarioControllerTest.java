//package com.caretronics.reunioes.testcontroller;
//
//import com.caretronics.reunioes.controller.FuncionarioController;
//import static org.mockito.Mockito.*;
//import static org.hamcrest.Matchers.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//import java.util.Arrays;
//import java.util.List;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import com.caretronics.reunioes.domain.Funcionario;
//import com.caretronics.reunioes.service.FuncionarioService;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
//public class FuncionarioControllerTest {
//
//	private MockMvc mockMvc;
//	
//    @Mock
//    private FuncionarioService funcionarioService;
//    
//    @InjectMocks
//    private FuncionarioController funcionarioController;    
//
//    @Before
//    public void setup() {
//    	MockitoAnnotations.initMocks(this);
//        mockMvc = MockMvcBuilders
//                .standaloneSetup(funcionarioController)
//                .build();
//    }
//    
//    @Test
//    public void test_get_all_success() throws Exception {
//        List<Funcionario> funcionarios = Arrays.asList(new Funcionario(1, "Ali", "CAVAC", 12000, 1),
//        		new Funcionario(2, "Veli", "YILDIZ", 10000, 1));
//        
//        when(funcionarioService.list()).thenReturn(funcionarios);
//        
//        mockMvc.perform(get("/funcionarios"))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
//                .andExpect(jsonPath("$", hasSize(2)))
//                .andExpect(jsonPath("$[0].id", is(1)))
//                .andExpect(jsonPath("$[0].nome", is("Ali")))
//                .andExpect(jsonPath("$[1].id", is(2)))
//                .andExpect(jsonPath("$[1].nome", is("Veli")));
//        
//        verify(funcionarioService, times(1)).list();
//        verifyNoMoreInteractions(funcionarioService);
//    }
//    
//    @Test
//    public void test_get_by_id_success() throws Exception {
//    	Funcionario funcionario = new Funcionario(1, "Ali", "CAVAC", 12000, 1);
//        when(funcionarioService.buscarPorId(1)).thenReturn(funcionario);
//        
//        mockMvc.perform(get("/funcionarios/{id}", 1))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
//                .andExpect(jsonPath("$.id", is(1)))
//                .andExpect(jsonPath("$.nome", is("Ali")));
//        
//        verify(funcionarioService, times(1)).buscarPorId(1);
//        verifyNoMoreInteractions(funcionarioService);
//    }
//    
//    @Test
//    public void test_get_by_id_fail_404_not_found() throws Exception {
//        when(funcionarioService.buscarPorId(1)).thenReturn(null);
//        
//        mockMvc.perform(get("/funcionarios/{id}", 1))
//                .andExpect(status().isNotFound());
//        
//        verify(funcionarioService, times(1)).buscarPorId(1);
//        verifyNoMoreInteractions(funcionarioService);
//    }
//    
//    @Test
//    public void test_create_success() throws Exception {
//    	Funcionario funcionario = new Funcionario(1, "Ali", "CAVAC", 12000, 1);
////        when(funcionarioService.salvar(funcionario)).thenReturn(Boolean.TRUE);
//        
//        mockMvc.perform(post("/funcionarios")
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(asJsonString(funcionario)))
//            		.andExpect(status().isCreated());
//        
//        verify(funcionarioService, times(1)).salvar(funcionario);
//        verifyNoMoreInteractions(funcionarioService);
//    }
//    
//    @Test
//    public void test_update_success() throws Exception {
//    	Funcionario funcionario = new Funcionario(1, "Ali", "CAVAC", 12000, 1);
//        when(funcionarioService.atualizar(funcionario)).thenReturn(Boolean.TRUE);
//        
//        mockMvc.perform(
//                put("/funcionarios/{id}", funcionario.getId())
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content(asJsonString(funcionario)))
//                	.andExpect(status().isOk());
//        
//        verify(funcionarioService, times(1)).atualizar(funcionario);
//        verifyNoMoreInteractions(funcionarioService);
//    }
//    
//    @Test
//    public void test_delete_success() throws Exception {
//    	Funcionario funcionario = new Funcionario(1, "Ali", "CAVAC", 12000, 1);
//        when(funcionarioService.excluirPorId(funcionario.getId())).thenReturn(Boolean.TRUE);
//        
//        mockMvc.perform(
//                delete("/funcionarios/{id}", funcionario.getId()))
//                .andExpect(status().isNoContent());
//        
//        verify(funcionarioService, times(1)).excluirPorId(funcionario.getId());
//        verifyNoMoreInteractions(funcionarioService);
//    }    
//    
//    public static String asJsonString(final Object obj) {
//        try {
//            final ObjectMapper mapper = new ObjectMapper();
//            return mapper.writeValueAsString(obj);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }    
//}
